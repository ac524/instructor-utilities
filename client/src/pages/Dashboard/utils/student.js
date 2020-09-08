const priorityLevels = [
    {
        key: "high",
        label: "High",
        test: level => level > 7,
        color: "danger"
    },
    {
        key: "low",
        label: "Low",
        test: level => level < 4,
        color: "primary"
    },
    {
        key: "mid",
        label: "Mid",
        color: "warning"
    }
];

export const usePriorityLevel = (level) => priorityLevels.find( priorityLevel => !priorityLevel.test || priorityLevel.test(level) );