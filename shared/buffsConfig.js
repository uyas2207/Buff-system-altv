//не забыть изменить на 10 секунд
export const defaultTickInterval = 1000;    //время в ms
export const defaultbuffDuration = 60000; // 60 000 ms = 1 min

export const baseObjectType = {
    Player: 0,
    Vehicle: 1,
    Ped: 2
}

export const buffInfoList = {
    medicalHelp: 
        {
            name: 'medicalHelp',
            allowedEntities: 'Player',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    drunk: 
        {
            name: 'drunk',
            allowedEntities: 'Vehicle',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    armor_regen: 
        {
            name: 'armor_regen',
            allowedEntities: 'Ped',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    fear:  
        {
            name: 'fear',
            allowedEntities: 'Ped',
            stackable: true,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    invisible:
        {
            name: 'invisible',
            allowedEntities: ['Player', 'Ped'],
            stackable: false,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        }
};

