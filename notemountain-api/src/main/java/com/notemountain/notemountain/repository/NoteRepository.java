package com.notemountain.notemountain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.notemountain.notemountain.entity.Note;

import jakarta.transaction.Transactional;

public interface NoteRepository extends JpaRepository<Note, Integer> {

	List<Note> getAllByDisplayName(String displayName);

	List<Note> getAllByNoteList_NoteListId(int id);

	@Query("SELECT n FROM Note n WHERE (n.header LIKE :prefix% OR n.content LIKE :prefix%) AND n.displayName = :displayName")
	List<Note> findAllByHeaderOrContentStartsWith(String prefix, String displayName);
	
	@Query("SELECT n FROM Note n WHERE (n.header LIKE %:prefix% OR n.content LIKE %:prefix%) AND n.displayName = :displayName")
	List<Note> findAllByHeaderOrContentContains(String prefix, String displayName);
	
	@Query("SELECT n FROM Note n WHERE (n.header LIKE %:prefix% OR n.content LIKE %:prefix%) AND n.displayName = :displayName AND n.noteList.noteListId = :noteListId")
	List<Note> findAllByHeaderOrContentContainsAndDisplayNameAndNoteListId( String prefix,  String displayName, int noteListId);

	
	List<Note> findAllByDisplayNameOrderByIdDesc(String displayName);
	
	List<Note> findAllByDisplayNameAndNoteList_NoteListIdOrderByIdDesc(String displayName,int noteListId);


	@Transactional
	void deleteAllByDisplayName( String displayName);
	
	

}
