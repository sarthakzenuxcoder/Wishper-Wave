import { useCallback, useEffect, useRef, useState } from "react"

const useStateWithCallback = (initialState) => {

    const [state, setState] = useState(initialState)
    const ref = useRef()

    const updateState = useCallback((newState, cb)=>{
        ref.current = cb;
        setState((prev)=> {return typeof newState === "function" ? newState(prev) : newState})
    }, [])

    useEffect(()=>{
        if(ref.current){
            ref.current(state)
            ref.current = null
        }
    }, [state])

    return [state, updateState]
}

export default useStateWithCallback