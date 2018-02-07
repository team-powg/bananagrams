import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

export function challenge(word) {
  var bool = true;
    //Merriam api
    word = word.toLowerCase();
    const merriamUrl =
      "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" +
      word +
      "?key=aa4c94ba-b93e-4f26-ba4a-764254860248";
    axios.get(merriamUrl).then(res => {

      var parser, xmlDoc;
      var text = res.data;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text,"text/xml");

      if (res.data.includes("<suggestion>") || res.data.includes(">abbrev") || res.data.includes(">sugg") || res.data.includes(">Middle Engli")) {
        bool = false;
      }
    });
    if (!bool) {
      return "Challenge successful.  This game is not over";
    } else {
      return `All words are valid in Merriam-Webster's dictionary.`
    }
  }
