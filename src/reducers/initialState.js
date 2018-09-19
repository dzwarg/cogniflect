import {fromJS} from 'immutable';

const initialState = fromJS({
  teamCode: '',
  userTeamCode: '',
  assessmentType: 'individual',
  questionCursor: 0,
  questions: [
    {
      id: 0,
      text: "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?",
      truth: 1,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '24' },
        { id: 1, text: '47' },
        { id: 2, text: '96' },
        { id: 3, text: '49' }
      ],
      next: 1
    },
    {
      id: 1,
      text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
      truth: 0,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '$0.05' },
        { id: 1, text: '$0.06' },
        { id: 2, text: '$0.10' },
        { id: 3, text: '$0.50' }
      ],
      next: 2
    },
    {
      id: 2,
      text: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
      truth: 0,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '5 minutes' },
        { id: 1, text: '100 minutes' },
        { id: 2, text: '500 minutes' },
        { id: 3, text: '10000 minutes' }
      ],
      next: 3
    },
    {
      id: 3,
      text: "If you’re running a race and you pass the person in second place, what place are you in?",
      truth: 1,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '1st place' },
        { id: 1, text: '2nd place' },
        { id: 2, text: '3rd place' },
        { id: 3, text: 'Last place' }
      ],
      next: 4
    },
    {
      id: 4,
      text: "A farmer had 15 sheep and all but 8 died. How many are left?",
      truth: 2,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '6' },
        { id: 1, text: '7' },
        { id: 2, text: '8' },
        { id: 3, text: '9' }
      ],
      next: 5
    },
    {
      id: 5,
      text: "Emily’s father has three daughters. The first two are named April and May. What is the third daughter’s name?",
      truth: 3,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: 'June' },
        { id: 1, text: 'August' },
        { id: 2, text: 'Summer' },
        { id: 3, text: 'Emily' }
      ],
      next: 6
    },
    {
      id: 6,
      text: "How many cubic feet of dirt are there in a hole that is 3’ deep x 3’ wide x 3’ long?",
      truth: 0,
      myAnswer: null,
      ourAnswer: null,
      teamAnswerCount: 0,
      guesses: [
        { id: 0, text: '0 ft^3' },
        { id: 1, text: '3 ft^3' },
        { id: 2, text: '9 ft^3' },
        { id: 3, text: '27 ft^3' }
      ],
      next: null
    }
  ],
  team: {
    members: 0,
    synced: 0
  }
});

export default initialState;