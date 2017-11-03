import React from 'react';
import { Image, Header, Container } from 'semantic-ui-react';

import simpleImage from './simple.png';
import advancedImage from './advanced.png';

export default function InstructionsPage() {
  return (
    <div>
      <Container text>
        <Header size="huge">The simple view</Header>
        <p>
          The simple moderator view is obvious that you can click a single
          button to submit the idea you have about the comment.
        </p>
        <Image size="medium" src={simpleImage} alt="Simple rating view" />
        <ul>
          <li>
            "It looks fine to me.": The comment shows no disrespect, no
            offensive or vulgar words, hence no toxicity.
          </li>
          <li>"It's somewhat offensive.": The comment is moderately toxic.</li>
          <li>
            "God! It's so wrong.": This indicates that a comment uses too strong
            language. This should not be on a Wikipedia discussion!
          </li>
          <li>
            "Can't read, not in English.": Select this if the comment is in
            another language or the comment contains only symbols that you
            cannot understand.
          </li>
          <li>
            "I'd just skip this.": You can always skip a comment if you don't
            like to rate it.
          </li>
        </ul>
        <hr />
        <Header size="huge">The advanced view</Header>
        <p>
          This is more complicated than the simple view in that this prompts the
          user for a full rating of different aspects of the comment.
        </p>
        <Image size="medium" src={advancedImage} alt="Advanced rating view" />
        <p>
          Each option has 3 possible rating values, more dark circles meaning a
          worse comment. There are 5 topics on which you can measure the
          toxicity of the comment. From these 5, only the first one 'toxicity'
          is required and that specifies the overall average toxicity of the
          comment. This is the same thing that is submitted when you use the
          simple view. Additionally, you can add some extra text to explain why
          the comment was toxic or not.
        </p>
        <p>
          You don't have to remember what each of these ratings and scopes mean;
          when you hover each section, a popup will appear with a text guiding
          you. The color coding and the smilies will give you a visual
          impression to make the process intuitive.
        </p>
        <p>
          Similar to the simple view, there are buttons to skip the question, or
          mark it unreadable if it isn't in English.
        </p>
        <hr />
        <p>
          You can always change views, even go to the help page or the
          leaderboard; the question you were reading will be preserved.
        </p>
      </Container>
    </div>
  );
}
