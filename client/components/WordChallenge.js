import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

export function challenge(word) {
  const merriamUrl = "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=aa4c94ba-b93e-4f26-ba4a-764254860248";

    //Merriam api
    axios
      .get(
        merriamUrl
      )
      .then(res => {
        if (res.data.includes('<suggestion>')) {
          console.log(word.toUpperCase() + ` ISN'T A WORD.`);
          console.log(`You're either trying to cheat or you're stupid.`)
        } else console.log(`All words are valid in Merriam-Webster's dictionary. Challenge failed, stupid.`)

      });
  }
