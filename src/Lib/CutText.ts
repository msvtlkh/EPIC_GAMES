export const cutText = (text: string) => {
    if(text.length > 120){
        return text.substring(0, 120) + '...'
    }
    
    return text
}