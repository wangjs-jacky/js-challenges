/* 
  高阶组件的应用
*/

/* 1. 全局环境 */
// 创建一个全局的环境
export const appContext = React.createContext(null)

/* 2. 封装一个使用全局环境的变量 */
// 封装 Provider 
export const Provider = ({ store, children }) => {
  return (
    <appContext.Provider value={store}>
      {children}
    </appContext.Provider>
  );
}

/* 3. _store */
const _store = {
  /* 初始化时，由外部传入 */
  appState: undefined,
  /* 初始化时，由外部传入 */
  reducer: undefined,
  setAppState(newState) {
    _store.appState = newState
    _store.listeners.map(fn => fn(_store.appState))
  },
  /*
    通过 [,update] = useState()刷新视图的方法存在一个问题：
    connect(connect) 会单独生成一个dispatch函数, 于是每一个connect的组件，只会刷新自己的状态，
    而无法把这个 state 的变化 映射到 所有依赖这个state的组件中。
    解决方法： 使用 eventhub，订阅 state 的变化。
    一旦某个state，就将 全局订阅state变化的组件 给渲染一下。
  */
  listeners: [],
  subscribe(fn) {
    _store.listeners.push(fn)
    return () => {
      _store.listeners.splice(_store.listeners.indexOf(fn), 1)
    }
  }
}

// createStore
export const createStore = (reducer, initState) => {
  _store.reducer = reducer
  _store.appState = initState
  return _store
}

/* 深比较 */
const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
}

/* connect 高阶组件应用 */
export const connect = (selector, dispatchSelector) => (Component) => {
  return (props) => {
    /* 连接全局环境 */
    const { appState, setAppState } = useContext(appContext);

    const dispatch = (actionType, payload) => {
      setAppState(store.reducer(appState, actionType, payload))
    }

    // 暴露出一个方法，用于触发函数更新
    const [, update] = useState({})

    /* 精准渲染-这个思想很好 */
    const data = selector ? selector(appState) : { appState: appState };
    const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : { dispatch: dispatch };

    /* 发布订阅模式 */
    /* 通过 dispatch 不会触发 store 引用地址变化，因而也不会触发 Context 执行 */
    useEffect(() => {
      /* 将 update 注册到 listener 内 */
      const unsubscribe = store.subscribe(() => {
        const newData = selector ? selector(store.appState) : { appState: store.appState }
        if (changed(data, newData)) {
          update({})
        }
      })
      return unsubscribe
    }, [selector]);

    return <Component {...props} {...dispatchers} {...data} />
  }
}