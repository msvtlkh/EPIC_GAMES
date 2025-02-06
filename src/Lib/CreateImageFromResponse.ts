export const CreateImageFromResponse = (image: string) => {
    const baseUrl = 'http://epicgamesserver/images/'
    const imageUrl = `${baseUrl}${image}`

    return imageUrl
}