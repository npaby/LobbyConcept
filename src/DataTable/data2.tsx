export type Member = {
    user_id: number;
    user_role: "Carry" | "Midlaner" | "Offlaner" | "Soft Support" | "Hard Support";
    user_owner: boolean;
};

export type Lobby = {
    Lobby_Id: number;
    Lobby_Name: string;
    Rank: string;
    Members: Member[];
};

export const dummyLobbies: Lobby[] =
    [
        {
            "Members": [
                {
                    "user_id": 7911,
                    "user_role": "Carry",
                    "user_owner": true
                },
                {
                    "user_id": 47389,
                    "user_role": "Carry",
                    "user_owner": false
                }
            ],
            "Lobby_Id": 9972,
            "Lobby_Name": "O1EPL1R3NOY4",
            "Rank": "Ancient"
        },
        {
            "Members": [
                {
                    "user_id": 20457,
                    "user_role": "Soft Support",
                    "user_owner": true
                },
                {
                    "user_id": 14788,
                    "user_role": "Carry",
                    "user_owner": false
                },
                {
                    "user_id": 58443,
                    "user_role": "Offlaner",
                    "user_owner": false
                }
            ],
            "Lobby_Id": 5131,
            "Lobby_Name": "HZLQBW62QZC4",
            "Rank": "Legend"
        }
    ]
