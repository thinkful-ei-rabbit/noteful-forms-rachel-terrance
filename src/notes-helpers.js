
export const findFolder = (folders, folder) =>
  folders.find(folder => folder.id === folder)

export const findNote = (notes, noteId) =>
  notes.find(note => note.id == noteId)

export const getNotesForFolder = (notes, folder) => (
  (!folder)
    ? notes
    : notes.filter(note => note.folder === folder)
)

export const countNotesForFolder = (notes, folder) =>
  notes.filter(note => note.folder === folder).length
