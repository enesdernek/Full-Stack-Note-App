package com.notemountain.notemountain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.notemountain.notemountain.entity.NoteList;
import com.notemountain.notemountain.repository.NoteListRepository;

@Service
public class NoteListService {
	
	private NoteListRepository noteListRepository;
	
	@Autowired
	public NoteListService(NoteListRepository noteListRepository) {
		this.noteListRepository = noteListRepository;
	}
	
	public void deleteAll() {
		this.noteListRepository.deleteAll();
	}
	
	public List<NoteList> getAllByDisplayName(String displayName){
		return this.noteListRepository.getAllByDisplayName(displayName);
	}
	
	public void deleteById(int id) {
		this.noteListRepository.deleteById(id);
	}
	
	public NoteList add(NoteList noteList) {
		return this.noteListRepository.save(noteList);
	}
	
	public NoteList updateById(int id,NoteList noteList) {
		 NoteList currentNoteList = this.noteListRepository.findById(id).get();
		 currentNoteList.setNoteListName(noteList.getNoteListName());
		 return this.noteListRepository.save(currentNoteList);
	}
	
	public NoteList getById(int id) {
		return this.noteListRepository.findById(id).get();
	}
	
	public void deleteAllByDisplayName(String displayName) {
		this.noteListRepository.deleteAllByDisplayName(displayName);
	} 
	
	


}
