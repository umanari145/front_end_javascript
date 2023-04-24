// typeはinterface 
// https://typescriptbook.jp/reference/object-oriented/interface/interface-vs-type-alias
type Listeners = {
    // 動的プロパティ
    [id: string]: {
        event: string
        element: HTMLElement
        handler: (e: Event) => void
    }
}  

export class EventListener {
    private readonly linsteners: Listeners = {}
    
    add(listenerId: string, event: string, element: HTMLElement, handler: (e :Event) => void) {
        
        this.linsteners[listenerId] = {
            event,
            element,
            handler
        }

        element.addEventListener(event, handler)
    }
    
    remove(listenerId: string):void {
        const listener = this.linsteners[listenerId];

        if (!listener) {
            return
        }

        listener.element.removeEventListener(
            listener.event, 
            listener.handler
        )

        delete this.linsteners[listenerId]
    }
}