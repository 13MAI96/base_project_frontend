export class DefaultResponse{
    code!: number
    message!: string
}

export class LoginResponse extends DefaultResponse{
    body!: LoginResponseBody
}

export class LoginResponseBody{
    user_id!: number
    username!: string
    token!: string
    role: string = 'player' 
}


export class LoginRequest{
    username!: string
    password!: string
}


