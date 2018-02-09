import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

export function challenge(word) {
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
      console.log('RES    DATA', xmlDoc)
      const definitionkEntries = xmlDoc.getElementsByTagName('entry_list')[0].childNodes;
      const definitionkEntriesLength = xmlDoc.getElementsByTagName('entry_list')[0].childNodes.length;
      console.log(`definitionkEntries[1]`, definitionkEntries[1].slice(1, 6))
      if (definitionkEntriesLength <= 1) {
        console.log(false, word, definitionkEntries);
        return [false, word];
      } else {
        console.log(true, word, definitionkEntries);
        return [true, word]
      }
    });
    // if (!bool) {
    //   return "Challenge successful.  This game is not over";
    // } else {
    //   return `All words are valid in Merriam-Webster's dictionary.`
    // }
  }
