export interface UserInterface {
    nickname?: string
    email: string
    password: string
    passwordConfirm?: string
}

export interface SignUpResponseInterface {
    status: 'string'
    token: 'string',
    data: {
        user: UserInterface
    },
}

export interface LoginResponseInterface {
    status: 'string'
    token: 'string',
    data: {
        user: LoginUserInterface
    },
}

export interface LoginUserInterface {
    user: {
      _id: string,
      role: string,
      email: string,
      balance: number,
      userLibrary: Array<unknown>,
      createdAt: string,
      __v: number
    }
}
