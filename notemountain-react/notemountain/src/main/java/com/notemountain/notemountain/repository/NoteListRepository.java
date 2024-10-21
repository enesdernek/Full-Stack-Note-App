package com.notemountain.notemountain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notemountain.notemountain.entity.NoteList;

import jakarta.transaction.Transactional;

public interface NoteListRepository extends JpaRepository<NoteList, Integer>{
	
	 List<NoteList> getAllByDisplayName(String displayName);
	 
	 @Transactional
	 void deleteAllByDisplayName(String displayName);
	
	
	
}
