const Players = {
    leftPlayer: {
        name: 'LeftPlayer_PWNZ',
        damage: 33,
        armor: 5,
        hitPoints: 100,
        img: "https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-07-512.png"
    },
    rightPlayer: {
        name: 'RightPlayer_Boss',
        damage: 31,
        armor: 8,
        hitPoints: 100,
        img: "https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-17-512.png"
    },
    battle: {
        rightPlayer: {
            attackSelectedOption: 'body',
            defendSelectedOption: 'body'
        },
        leftPlayer: {
            attackSelectedOption: '',
            defendSelectedOption: ''
        }
    },
    attackSelectedOption: '',
    defendSelectedOption: '',
    leftHP: 100,
    rightHP: 100,
}

export default Players;