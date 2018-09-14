import {fromJS} from 'immutable';

const initialState = fromJS({
  teamCode: '',
  questions: [
    {
      text: "What is the air speed of an unlaiden swallow?",
      truth: 0,
      answer: null,
      guesses: [
        { id: 0, text: 'African or European?' },
        { id: 1, text: '42' },
        { id: 2, text: 'true' },
        { id: 3, text: 'n/a' }
      ]
    },
    {
      text: "Who is the 55th President of the United States?",
      truth: 1,
      answer: null,
      guesses: [
        { id: 0, text: 'McCauley Caulkin' },
        { id: 1, text: 'Bugs Bunny' },
        { id: 2, text: 'Robot Overloads v1.0' },
        { id: 3, text: 'Trick question, WWIII will have destroyed any concept of nation-state for the survivors of a post-apocalyptic husk of a planet.' }
      ]
    }
  ]
});

export default initialState;