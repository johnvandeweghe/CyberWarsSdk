interface ApiResponse {
  data: object;
}

export enum ObjectType {
    GAME = 'Game',
}

export class Client {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getObject(objectType: ObjectType, id: string): Promise<ApiResponse> {
    return fetch(`${this.baseUrl}${objectType.toLowerCase()}/${id}`)
            .then(Client.handleApiResponse)
            .then((json: object) => {
              return {
                data: json,
              };
            });
  }

  public createObject(objectType: ObjectType, objectData: object): Promise<ApiResponse> {
    return fetch(this.baseUrl + objectType.toLowerCase(), {
      method: 'POST',
    })
      .then(Client.handleApiResponse)
      .then((json: object) => {
        return {
          data: json,
        };
      });
  }

  private static handleApiResponse(data: Response) {
    return new Promise((resolve, reject) => {
      if (data.status == 200) {
        resolve(data.json())
      } else {
        reject(data)
      }
    });
  }
}
