package com.notemountain.notemountain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notemountain.notemountain.entity.Note;
import com.notemountain.notemountain.service.NoteService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/note")
public class NoteController {
	
	private NoteService noteService;
	
	@Autowired
	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}
	
	@GetMapping("/findallbydisplaynamedesc")
	List<Note> findAllByDisplayNameOrderByIdDesc(@RequestParam String displayName){
		return this.noteService.findAllByDisplayNameOrderByIdDesc(displayName);
		
	}
	
	@GetMapping(("/findallbydisplaynameandnotelistiddesc"))
	public List<Note> findAllByDisplayNameAndNoteList_NoteListIdOrderByIdDesc(@RequestParam String displayName,@RequestParam int noteListId){
		return this.noteService.findAllByDisplayNameAndNoteList_NoteListIdOrderByIdDesc(displayName, noteListId);
	}
	
	@GetMapping("/findallbyheaderorcontentstartswith")
	public List<Note>findAllByHeaderOrContentStartsWith(@RequestParam String prefix,@RequestParam String displayName){
		return this.noteService.findAllByHeaderOrContentStartsWith(prefix,displayName);
	}
	
	@GetMapping("/findallbyheaderorcontentcontains")
	public List<Note> findAllByHeaderOrContentContains(@RequestParam String prefix,@RequestParam String displayName){
		return this.noteService.findAllByHeaderOrContentContains(prefix, displayName);
	}
	
	@GetMapping("/findallbyheaderorcontentcontainsanddisplaynameandnotelistid")
	List<Note> findAllByHeaderOrContentContainsAndDisplayNameAndNoteListId(@RequestParam String prefix, @RequestParam String displayName,@RequestParam int noteListId){
		return this.noteService.findAllByHeaderOrContentContainsAndDisplayNameAndNoteListId(prefix, displayName, noteListId);
	}
	
	@GetMapping("/getallbydisplayname")
	public List<Note> getAllByDisplayName(@RequestParam String displayName){
		return this.noteService.getAllByDisplayName(displayName);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Note>add(@Valid @RequestBody Note note){
		Note savedNote = this.noteService.add(note);
		return new ResponseEntity<>(savedNote,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/deletebyid")
	public void deleteById(@RequestParam int id) { 
		 this.noteService.deleteById(id);		
	}
	
	@DeleteMapping("/deleteallbydisplayname")
	public void deleteAllByDisplayName(@RequestParam String displayName) {
		 this.noteService.deleteAllByDisplayName(displayName);
	}
	
	@PutMapping("/updatebyid")
	public void updateById(@RequestParam int id,@RequestBody Note note) { 
		this.noteService.updateById(id,note);
		 
	}
	
	@GetMapping("/getallbynotelistid")
	public List<Note>getAllByNoteList_NoteListId(@RequestParam int id){
		return this.noteService.getAllByNoteList_NoteListId(id);
	}
	
	@GetMapping("/getbyid")
	public Note getById(@RequestParam int id) {
		return this.noteService.getById(id);
	}
}
