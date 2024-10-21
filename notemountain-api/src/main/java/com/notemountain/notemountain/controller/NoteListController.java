package com.notemountain.notemountain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.notemountain.notemountain.entity.NoteList;
import com.notemountain.notemountain.service.NoteListService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/notelist")
public class NoteListController {

	private NoteListService noteListService;

	@Autowired
	public NoteListController(NoteListService noteListService) {
		this.noteListService = noteListService;
	}

	@GetMapping("/getallbydisplayname")
	public List<NoteList> getAllByDisplayName(@RequestParam String displayName) {
		return this.noteListService.getAllByDisplayName(displayName);
	}
	
	@DeleteMapping("/deleteall")
	public void deleteAll() {
		this.noteListService.deleteAll();
	}
	
	@DeleteMapping("/deletebyid")
	public void deleteById(@RequestParam int id) {
		this.noteListService.deleteById(id);
	}
	
	@PostMapping("/add")
	public ResponseEntity<NoteList> add(@Valid @RequestBody NoteList noteList){
		NoteList savedNoteList = this.noteListService.add(noteList);
		return new ResponseEntity<>(savedNoteList,HttpStatus.CREATED);
	}
	
	@PutMapping("/updatebyid")
	public NoteList updateById(@RequestParam int id,@RequestBody NoteList noteList) {
		 return this.noteListService.updateById(id, noteList);
	}

	@GetMapping("/getbyid")
	public NoteList getById(@RequestParam int id) {
		return this.noteListService.getById(id);
	}
	
	@DeleteMapping("/deleteallbydisplayname")
	public void deleteAllByDisplayName(@RequestParam String displayName) {
		this.noteListService.deleteAllByDisplayName(displayName);
	} 

}
