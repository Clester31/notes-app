export interface TagType {
    id: string
    color: string
    name: string
}

export interface NoteType {
    id: string
    title: string
    content: string
    isPinned: boolean
    isArchived: boolean
    createdAt: string
    updatedAt: string
}

export interface NoteTagType {
    tagId: string
    noteId: string
}

export interface NewTagSchemaType {
    name: string
    color: string
}

export interface NewNoteSchemaType {
    title: string
    content: string
    isPinned: boolean
    isArchived: boolean
}