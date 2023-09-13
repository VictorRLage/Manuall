const items = [
    { id: 1, name: "Básico" },
    { id: 2, name: "Premium" },
    { id: 3, name: "Advanced" },
]

export default {
    fromIdToName: (id) => items.find(item => item.id === id)?.name,
    fromNameToId: (name) => items.find(item => item.name === name)?.id,
}