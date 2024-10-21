package com.notemountain.notemountain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="note")
public class Note {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@NotNull
	@NotBlank
	@Column(name="display_name")
	private String displayName;
	
	@NotNull
	@NotBlank
	@Column(name="header")
	private String header;
	
	@NotNull
	@NotBlank
	@Column(name="content")
	private String content;

	
	@Column(name="start_date")
	private String startDate;
	
	
	@Column(name="background_color")
	private String backgroundColor;
	
	
	@ManyToOne()
	@JoinColumn(name="note_list_id")
	private NoteList noteList;
	
	
	
	

}
