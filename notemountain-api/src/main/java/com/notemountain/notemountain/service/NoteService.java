package com.notemountain.notemountain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.notemountain.notemountain.entity.Note;
import com.notemountain.notemountain.repository.NoteRepository;

@Service
public class NoteService {
	
	private NoteRepository noteRepository;
	
	@Autowired
	public NoteService(NoteRepository noteRepository){
		this.noteRepository=noteRepository;
	}
	
	public List<Note> findAllByHeaderOrContentStartsWith(String prefix,String displayName){
		return this.noteRepository.findAllByHeaderOrContentStartsWith(prefix,displayName);
	}
	
	public List<Note> findAllByDisplayNameOrderByIdDesc(String displayName){
		return this.noteRepository.findAllByDisplayNameOrderByIdDesc(displayName);
		
	}
	
	public List<Note> findAllByDisplayNameAndNoteList_NoteListIdOrderByIdDesc(String displayName,int noteListId){
		return this.noteRepository.findAllByDisplayNameAndNoteList_NoteListIdOrderByIdDesc(displayName,noteListId);
	}
	
	public List<Note> findAllByHeaderOrContentContains(String prefix, String displayName){
		return this.noteRepository.findAllByHeaderOrContentContains(prefix, displayName);
	}
	
	public List<Note> findAllByHeaderOrContentContainsAndDisplayNameAndNoteListId( String prefix,  String displayName, int noteListId){
		return this.noteRepository.findAllByHeaderOrContentContainsAndDisplayNameAndNoteListId(prefix, displayName, noteListId);
	}
	
	public void deleteAllByDisplayName(String displayName) {
		 this.noteRepository.deleteAllByDisplayName(displayName);
	}
	
	
	public List<Note> getAllByDisplayName(String displayName){
		return this.noteRepository.getAllByDisplayName(displayName);
	}
	
	
	public Note add(Note note) { 
		return this.noteRepository.save(note);
		
	}
	
	public void deleteById(int id) { 
		 this.noteRepository.deleteById(id);		
	}
	
	public void updateById(int id,Note note) { 
		Note currentNote = this.noteRepository.findById(id).get();
		currentNote.setBackgroundColor(note.getBackgroundColor());
		currentNote.setContent(note.getContent());
		currentNote.setHeader(note.getHeader());
		currentNote.setNoteList(note.getNoteList());
		
		this.noteRepository.save(currentNote);
		 
	}
	
	public List<Note>getAllByNoteList_NoteListId(int id){
		return this.noteRepository.getAllByNoteList_NoteListId(id);
	}
	
	public Note getById(int id) {
		return this.noteRepository.findById(id).get();
	}
	

}
