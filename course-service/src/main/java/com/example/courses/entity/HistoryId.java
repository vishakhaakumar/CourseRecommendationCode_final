package com.example.courses.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Embeddable
public class HistoryId implements Serializable {
    long studentId;
    long courseId;
    long semester;
}
