export interface AssessmentModel {
  id: string;
  createdBy: string;
  createdAt: Date;
  lastUpdateBy: string;
  lastUpdateAt: Date;
  isPrivate: boolean;
  conversationId: string;
  note: string;
  messages: AssessmentMessagesModel;
  rating: number;
  personality: AssessmentPersonalityModel[];
  qa: AssessmentQaModel[];
}

export interface AssessmentPersonalityModel {
  descriptor: string;
  antonym: string;
  score: number;
  min: number;
  max: number;
}

export interface AssessmentMessagesModel {
  [key: string]: {
    note: string;
    createdAt: Date;
    createdBy: string;
  };
}

export interface AssessmentQaModel {
  expanded: boolean;
  title: string;
  section: {
    label: string;
    score?: number;
  }[];
}

export class Assessment implements AssessmentModel {
  constructor(
    public id: string,
    public createdBy: string,
    public lastUpdateBy: string,
    public conversationId: string,
    public isPrivate: boolean = false
  ) {}

  date = new Date();
  createdAt = this.date;
  lastUpdateAt = this.date;
  note = '';
  rating = 0;
  messages = null;

  personality: AssessmentPersonalityModel[] = [
    { descriptor: 'Natural', antonym: 'Stiff', score: 0, min: -5, max: 5 },
    { descriptor: 'Warm', antonym: 'Cold', score: 0, min: -5, max: 5 },
    { descriptor: 'Formal', antonym: 'Casual', score: 0, min: -5, max: 5 },
    { descriptor: 'Humorous', antonym: 'Serious', score: 0, min: -5, max: 5 },
    { descriptor: 'Succinct', antonym: 'Wordy', score: 0, min: -5, max: 5 },
    { descriptor: 'Polite', antonym: 'Blunt', score: 0, min: -5, max: 5 },
    {
      descriptor: 'Energetic',
      antonym: 'Lethargic',
      score: 0,
      min: -5,
      max: 5,
    },
    { descriptor: 'Younger', antonym: 'Older', score: 0, min: -5, max: 5 },
  ];

  qa: AssessmentQaModel[] = [
    {
      title: 'S - Set the Tone',
      expanded: true,
      section: [
        {
          label: 'Identified to the visitor they are chatting with a BOT',
          score: 0,
        },
        {
          label: 'Used a positive introduction with a willingness to assist',
          score: 0,
        },
        { label: 'Identify the capability of the BOT', score: 0 },
        { label: 'Provide examples of how to interact', score: 0 },
        { label: 'Personalized visitors experience', score: 0 },
      ],
    },

    {
      title: 'U - Understand Your Customer',
      expanded: true,
      section: [
        {
          label: 'Used simple responses to validate BOT understands Intent',
          score: 0,
        },
        {
          label:
            'Ask follow up questions to further validate intent or request bit of information to progress conversation',
          score: 0,
        },
        {
          label: 'Relayed a clear understanding of the customers intent',
          score: 0,
        },
        {
          label:
            'Properly handled confusion of intent and redirected conversation appropriately',
          score: 0,
        },
      ],
    },

    {
      title: 'R - Relay the Solution',
      expanded: true,
      section: [
        {
          label: 'Conveyed proper response to customers intent or request',
          score: 0,
        },
        {
          label:
            'Provided complete, accurate information and/or a correct resolution',
          score: 0,
        },
        {
          label: 'Properly leveraged client systems to relay the solution',
          score: 0,
        },
        {
          label:
            'Solution was provided in the conversation and not directed to the site',
          score: 0,
        },
        {
          label:
            'Advised and Suggested additional context to solution where needed',
          score: 0,
        },
      ],
    },

    {
      title: 'A - Achieve the Intended Close',
      expanded: true,
      section: [
        {
          label:
            'Handled objections and asked for a commitment to the next step',
          score: 0,
        },
        {
          label:
            'Attempted to retain the customer in the BOT converasation when appropriate',
          score: 0,
        },
        {
          label: 'Escalated properly to an agent when applicable or requested',
          score: 0,
        },
        {
          label:
            'Verified overall needs were satisfactorily met and a proper closing issued',
          score: 0,
        },
      ],
    },
  ];
}
