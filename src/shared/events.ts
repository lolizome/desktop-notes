
export const broadcastEvent = (eventName: string, data: any) => {
    return new CustomEvent(eventName, {
        detail: data
    })
}