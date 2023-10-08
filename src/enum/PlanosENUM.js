const items = [
    { id: 1, name: "Basic" },
    { id: 2, name: "Advanced" },
    { id: 3, name: "Premium" },
]

export default {
    fromIdToName: (id) => items.find(item => item.id === id)?.name,
    fromNameToId: (name) => items.find(item => item.name === name)?.id,
}