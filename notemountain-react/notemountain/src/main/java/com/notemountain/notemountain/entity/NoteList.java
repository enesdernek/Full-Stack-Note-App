package com.notemountain.notemountain.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="note_list")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","notes"})
public class NoteList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="list_id")
	private int noteListId;
	
	@Column(name="note_list_name")
	@NotNull
	@NotBlank(message = "List name cant be blank")
	private String noteListName;
	
	@Column(name="display_name")
	private String displayName;
	
	@OneToMany(mappedBy = "noteList", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Note> notes;
	
	

}
