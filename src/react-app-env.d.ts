/// <reference types="react-scripts" />

declare module 'use-bus' {
    export const dispatch = ({ type: string, payload: any }) => {};
    export const useBus = (filter:string, callback:(action)=>void, deps:any)=> {};
}