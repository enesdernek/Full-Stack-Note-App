import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    notes: null,
    note: null
}

export const getNotesByDisplayNameAndNoteListIdDesc = createAsyncThunk("notes/getNotesByDisplayNameAndNoteListIdDesc",
    async (body) => {
        const response = await axios.get(`http://localhost:8080/note/findallbydisplaynameandnotelistiddesc?displayName=${body.displayName}&noteListId=${body.noteListId}`)
        return response.data
    }
)

export const getNoteById = createAsyncThunk("note/getNoteById",
    async (id) => {
        const response = await axios.get("http://localhost:8080/note/getbyid?id=" + id)
        return response.data
    }
)

export const createNote = createAsyncThunk("notes/createNote",
    async (note) => {
        const response = await axios.post("http://localhost:8080/note/add", note)
        return response.data
    }
)

export const removeNote = createAsyncThunk("notes/deleteNote",
    async (id) => {
        await axios.delete("http://localhost:8080/note/deletebyid?id=" + id)
    }
)

export const updateNote = createAsyncThunk("notes/updateNote",
    async (body) => {
        await axios.put(`http://localhost:8080/note/updatebyid?id=${body.id}`, body)
    }
)

export const getAllByHeaderOrContentContains = createAsyncThunk("notes/getAllByHeaderOrContentStartsWith",
    async (body) => {
        const response = await axios.get(`http://localhost:8080/note/findallbyheaderorcontentcontains?prefix=${body.prefix}&displayName=${body.displayName}`)
        return response.data
    }
)

export const getAllByDisplayName = createAsyncThunk("notes/getAllByDisplayName",
    async (displayName) => {
        const response = await axios.get(`http://localhost:8080/note/findallbydisplaynamedesc?displayName=${displayName}`)
        return response.data
    }
)

export const deleteAllByDisplayName = createAsyncThunk("notes/deleteAllByDisplayName",
    async (displayName) => {
        await axios.delete(`http://localhost:8080/note/deleteallbydisplayname?displayName=${displayName}`)
    }
)

export const getAllByHeaderOrContentContainsAndNoteListId = createAsyncThunk("notes/getAllByHeaderOrContentContainsAndNoteListId",
    async (body) => {
        const response = await axios.get(`http://localhost:8080/note/findallbyheaderorcontentcontainsanddisplaynameandnotelistid?prefix=${body.prefix}&displayName=${body.displayName}&noteListId=${body.noteListId}`)
        return response.data
    }
)

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNotesByDisplayNameAndNoteListIdDesc.fulfilled, (state, action) => {
            state.notes = action.payload
        })
        builder.addCase(deleteAllByDisplayName.fulfilled, (state) => {
            state.notes = null
        })
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.notes.unshift(action.payload);
        })
        builder.addCase(getNoteById.fulfilled, (state, action) => {
            state.note = action.payload
        })
        builder.addCase(getAllByHeaderOrContentContains.fulfilled, (state, action) => {
            state.notes = action.payload
        })
        builder.addCase(getAllByHeaderOrContentContainsAndNoteListId.fulfilled, (state, action) => {
            state.notes = action.payload
        })
        builder.addCase(getAllByDisplayName.fulfilled, (state, action) => {
            state.notes = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = noteSlice.actions

export default noteSlice.reducer