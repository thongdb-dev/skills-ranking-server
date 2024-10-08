import Skill from '../models/Skill.js';
import User from '../models/User.js';

export async function insertSampleSkills() {
  try {
    const user = await User.findOne({ email: 'fakeperson@gmail.com' });

    if (!user) {
      console.error('User not found!');
      return;
    }

    const sampleSkills = [
      {
        name: 'JavaScript',
        description:
          'A high-level programming language used for web development.',
        image: 'path/to/javascript-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Python',
        description:
          'A versatile programming language known for its readability.',
        image: 'path/to/python-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Java',
        description:
          'A class-based, object-oriented programming language used for building platform-independent applications.',
        image: 'path/to/java-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'C++',
        description:
          'A powerful programming language that supports procedural and object-oriented programming.',
        image: 'path/to/cpp-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Ruby',
        description:
          'A dynamic, object-oriented programming language known for its simplicity.',
        image: 'path/to/ruby-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'PHP',
        description:
          'A server-side scripting language designed for web development.',
        image: 'path/to/php-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Go',
        description:
          'An open-source programming language that makes it easy to build simple, reliable, and efficient software.',
        image: 'path/to/go-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Swift',
        description:
          'A powerful and intuitive programming language for macOS and iOS apps.',
        image: 'path/to/swift-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Kotlin',
        description:
          'A modern programming language that makes developers happier.',
        image: 'path/to/kotlin-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'SQL',
        description:
          'A standard language for accessing and manipulating databases.',
        image: 'path/to/sql-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'C#',
        description:
          'A modern, object-oriented programming language developed by Microsoft.',
        image: 'path/to/csharp-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'R',
        description:
          'A programming language and software environment for statistical computing and graphics.',
        image: 'path/to/r-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'TypeScript',
        description:
          'A strict syntactical superset of JavaScript that adds optional static typing.',
        image: 'path/to/typescript-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'HTML',
        description: 'The standard markup language for creating web pages.',
        image: 'path/to/html-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'CSS',
        description:
          'A style sheet language used for describing the presentation of a document written in HTML.',
        image: 'path/to/css-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Rust',
        description:
          'A systems programming language that is focused on safety, speed, and concurrency.',
        image: 'path/to/rust-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Dart',
        description:
          'An open-source general-purpose programming language that is easy to learn.',
        image: 'path/to/dart-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Scala',
        description:
          'A general-purpose programming language that provides support for functional programming.',
        image: 'path/to/scala-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Perl',
        description:
          'A high-level programming language known for its text processing capabilities.',
        image: 'path/to/perl-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Lua',
        description:
          'A lightweight, high-level programming language designed for embedded use.',
        image: 'path/to/lua-image.jpg',
        creator: user._id,
        active: 1,
      },
      {
        name: 'Haskell',
        description:
          'A standardized, general-purpose purely functional programming language.',
        image: 'path/to/haskell-image.jpg',
        creator: user._id,
        active: 1,
      },
    ];

    const skills = await Skill.insertMany(sampleSkills);
    console.log('Sample skills inserted:', skills);
  } catch (error) {
    console.error('Error inserting skills:', error);
  }
}
