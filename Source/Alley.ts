namespace Endabgabe {
  export async function Alley(): ƒS.SceneReturn {
    console.log("FudgeStory Endabgabe Scene starting");
    //alert("Vollbild Modus (F11) zu empfehlen.");
    let menu = ƒS.Menu.create(menuItems, menuButtons, "menu");
    menu.open();
      
	// Speeches
    let text = {
        Protagonist: {
            S1000_01: "Hmmm, der Bus kommt mal wieder zu spät. Als wäre es nicht schon spät genug und dann jeden Tag sowas. Und dann war es heute noch so ein harter Tag, wenigstens heute hätte der Bus pünktlich kommen können...",
            S1000_02: "Wo kam der Schrei her? Ich sollte mal nachsehen...",
            S1000_03: "Ich glaube der Schrei kam aus dieser Gasse...",
            S1000_04: "Was soll ich tun?",
            S1000_05: "Ich sollte sie aufhalten, aber wie?",

            S1121_01: "Hey Jungs, lasst sie in Ruhe! Ihr könnt doch sowas nicht machen, beruhigt euch doch!",
            S1121_05: "Ahhh!",

            S1122_01: "Hey! Haut mal schnell ab von hier, ich habe die Polizei gerufen.",
            S1122_04: "Wir wollen hier doch nichts überstürz…",
            S1122_09: "Doch, ich habe sie nicht gerufen…",

            S1123_01: "Verzieht euch lieber schnell von hier oder das wird ziemlich unschön.",
            S1123_03: "Sicher, dass du weiterreden möchtest?"
        },
        Sumi: {
            S1121_08: "Schnell weg hier, die Polizei ist gleich hier. Ich wohne hier in der Nähe, dort kann ich dich verarzten.",

            S1122_08: "Du hast gar nicht gelogen?",
            S1122_10: "Naja, egal du siehst schlimm aus. Ich wohn hier in der Nähe, lass uns schnell von hier verschwinden.",

            S1123_07: "He du! Bleib bei mir, ich hole einen Krankenwagen! HILFE!"
        },
        Nobu: {
            S1121_02: "Hey Kleiner, verzieh dich. Geh einfach weiter und tu so als hättest du nichts gesehen.",
            S1121_03: "Junge, ich habe dich gewarnt, letzte Chance. Oder willst du den nächsten Tag nicht mehr erleben?",
            S1121_04: "Wenn du nicht hören willst, musst du eben fühlen du kleine Ratte.",
            S1121_06: "Du hättest auf mich hören sollen, jetzt ist es vorbei mit dir…",

            S1122_02: "Heee?! Du kleine Ratte bluffst doch. Du willst wohl drauf gehen?",
            S1122_03: "Du willst dich wohl mit uns anlegen? Wärst du bloß lieber einfach weitergelaufen, dann wäre dir nichts passiert.",
            S1122_05: "Wolltest du den Helden spielen? Das hat man davon du….",
            S1122_07: "Hast nochmal Glück gehabt du Wicht.",

            S1123_02: "Großes Maul für so ein halbes Hemd. Ha! Sicher, dass du dich mit uns anlegen möchtest?",
            S1123_04: "Hahaha! Nach der Ansage bin ich ja ziemlich enttäuscht von dir, du Ratte! Jetzt liegst du auf dem Boden, wo du auch hingehörst. Sicher, dass du weitermachen willst?",
            S1123_05: "Na warte, jetzt ist der Faden aber gerissen.",
            S1123_06: "Haha! Einstecken kannst du ja, aber wie lange hältst du durch?"
        },
        Schlaeger: {
            S1121_07: "Was, die Cops? Schnell weg hier!!!",

            S1122_06: "Er hat nicht gelogen? Schnell weg hier!"
        }
    };


    // Decisions
	  let interfereOrNot;
    let howToInterfere;
    let nobuTalk;
    let provokeOrKeepUp;

    let interfereOrNotAnswer = {
      ignore: "Ignorieren",
      interefere: "Einmischen"
    };

    let howToInterfereAnswer = {
      talk: "Mit den Jungs reden",
      threatenWithCops: "Mit der Polizei drohen",
      threatenWithViolence: "Mit Gewalt drohen",
      getHelp:  "Hilfe holen"
    };

    let nobuTalk1Answer = {
      iWillNot: "Das werde ich nicht.",
      goHome: "Geht doch einfach nach Hause.",
      unfair: "Fünf gegen Eine ist ziemlich unfair."
    };

    let nobuTalk2Answer = {
      justTalk: "Ich will nur reden",
      threaten: "Drohst du mir?"
    };

    let nobuTalk3Answer = {
      iLied: "War gelogen.",
      policeComing: "Sie sind unterwegs."
    };

    let nobuTalk4Answer = {
      doNotFight: "Kampf vermeiden",
      fight: "Sich wehren"
    };

    let provokeOrKeepUpAnswer = {
      provoke: "Mehr hast du nicht drauf?",
      keepUp: "Das kann den ganzen Tag so weitergehen!"
    };

    // Start
    ƒS.Speech.hide();
    await ƒS.Location.show(locations.street);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1000_01);
    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1000_02);
    await ƒS.Location.show(locations.alley);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1000_03);
    await ƒS.Location.show(sequences.harassment);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1000_04);
    interfereOrNot = await ƒS.Menu.getInput(interfereOrNotAnswer, "decisionClass");

    switch (interfereOrNot) {
              case interfereOrNotAnswer.ignore:
                  // Zeitungsartikel fehlt
                  return await badEnding1();
              case interfereOrNotAnswer.interefere:
                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1000_05);
                howToInterfere = await ƒS.Menu.getInput(howToInterfereAnswer, "decisionClass");
                break;
    }

    switch (howToInterfere) {
              case howToInterfereAnswer.talk:
                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1121_01);
                await ƒS.Location.show(locations.alley);
                await ƒS.update(1);
                await ƒS.Character.show(characters.nobu, characters.nobu.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(1);
                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1121_02);
                
                nobuTalk = await ƒS.Menu.getInput(nobuTalk1Answer, "decisionClass");

                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1121_03);

                nobuTalk = await ƒS.Menu.getInput(nobuTalk2Answer, "decisionClass");

                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1121_04);

                await ƒS.Character.hide(characters.nobu);
                await ƒS.Location.show(sequences.coming);
                await ƒS.update(2);
                await ƒS.Location.show(sequences.nobuHitMad);
                await ƒS.update(2);

                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1121_05);

                await ƒS.Location.show(locations.alley);
                await ƒS.update(1);
                await ƒS.Character.show(characters.nobu, characters.nobu.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(1);

                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1121_06);

                // Polizei Sirenen oder so

                await ƒS.Speech.tell(characters.schlaeger, text.Schlaeger.S1121_07);

                ƒS.Character.hide(characters.nobu);
                await ƒS.Location.show(sequences.gimmeYourHand);
                await ƒS.update(1);
                await ƒS.Speech.tell(characters.sumi, text.Sumi.S1121_08);

                return "SumisHome";
              case howToInterfereAnswer.threatenWithCops:
                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1122_01);
                await ƒS.Location.show(locations.alley);
                await ƒS.update(1);
                await ƒS.Character.show(characters.nobu, characters.nobu.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(1);
                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1122_02);
                  
                nobuTalk = await ƒS.Menu.getInput(nobuTalk3Answer, "decisionClass");

                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1122_03);
                
                await ƒS.Character.hide(characters.nobu);
                await ƒS.Location.show(sequences.coming);
                await ƒS.update(2);

                nobuTalk = await ƒS.Menu.getInput(nobuTalk4Answer, "decisionClass");

                switch (nobuTalk) {
                  case nobuTalk4Answer.doNotFight:
                    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1122_04);
                    await ƒS.Location.show(sequences.nobuHitMad);
                    await ƒS.update(2);
                    await ƒS.Speech.tell(characters.nobu, text.Nobu.S1122_05);

                    await ƒS.Location.show(locations.alley);
                    await ƒS.update(1);
                    
                    // Polizei Sirenen oder so

                    await ƒS.Speech.tell(characters.schlaeger, text.Schlaeger.S1122_06);
                    await ƒS.Speech.tell(characters.nobu, text.Nobu.S1122_07);
                    ƒS.Character.hide(characters.nobu);
                    await ƒS.Location.show(sequences.gimmeYourHand);
                    await ƒS.update(2);
                    await ƒS.Speech.tell(characters.sumi, text.Sumi.S1122_08);
                    await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1122_09);
                    await ƒS.Speech.tell(characters.sumi, text.Sumi.S1122_10);
                    return "SumisHome";
                  case nobuTalk4Answer.fight:
                }

              case howToInterfereAnswer.threatenWithViolence:
                await ƒS.Location.show(sequences.coming);
                await ƒS.update(2);
                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1123_01);
                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1123_02);
                await ƒS.Speech.tell(characters.protagonist, text.Protagonist.S1123_03);

                await ƒS.Character.hide(characters.nobu);
                await ƒS.Location.show(sequences.nobuHitMad);
                await ƒS.update(2);

                await ƒS.Speech.tell(characters.nobu, text.Nobu.S1123_04);

                // Zwischensequenz?
                
                provokeOrKeepUp = await ƒS.Menu.getInput(provokeOrKeepUpAnswer, "decisionClass");

                switch (provokeOrKeepUp) {
                  case provokeOrKeepUpAnswer.provoke:
                    await ƒS.Speech.tell(characters.nobu, text.Nobu.S1123_05);
                    await ƒS.Location.show(sequences.nobuKnife);
                    await ƒS.update(2);
                    return badEnding2;
                  case provokeOrKeepUpAnswer.keepUp:
                    await ƒS.Speech.tell(characters.nobu, text.Nobu.S1123_06);
                    await ƒS.Location.show(sequences.nobuHitMad);
                    await ƒS.update(2);
                    await ƒS.Speech.tell(characters.sumi, text.Sumi.S1123_07);
                }
                //WIP for Hospital Scene
                return "protagonistHospital";
              case howToInterfereAnswer.getHelp:


                //WIP for Hospital Scene
                return "sumiHospital";
    }
  }
}