import { GetAllGamesResponse } from "../types/game"

export const getDataFromResponse = (data: GetAllGamesResponse) => {
    return data.data.games
}