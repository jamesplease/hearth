import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FireGuide extends Component {
  render() {
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link to="/guides" className="navBackLink">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Guides
        </Link>
        <h1 className="primaryHeader">Stock Market Investing</h1>
        <p className="appParagraph">
          Growing up, the idea of putting money into the stock market sounded to
          me like risky business. Any time there was an economic downturn, the
          news would report how everyone was losing all of their money.
        </p>
        <p className="appParagraph">
          Plus, the stock market made me think of important-looking men in suits
          shouting and running around in New York City. It didn’t seem relevant
          to me nor my rural, working class family.
        </p>
        <p className="appParagraph">
          Imagine my surprise when I learned that investing in the stock market
          is a good idea for the average person, <i>and</i> that it's
          particularly important for anyone planning to FIRE. What's more, it
          turns out that there are ways to do it that are financially safe,
          low-stress, and don't take much time. No suits required.
        </p>
        <h2 className="secondaryHeader">The Wrong Way to Invest</h2>
        <p className="appParagraph">
          The stock market <i>can</i> be risky. It's risky when you try and
          predict how well a single company will do. The problem with this
          approach is that individual companies may do really well or really
          bad, and you are always guessing how you think they will perform.
        </p>
        <p className="appParagraph">
          Betting on one or a few companies is the financial equivalent of
          putting all of your eggs into one basket. Because of this, many people
          who are FIRE'd choose not invest too much money into any one company.
        </p>
        <p className="appParagraph">
          When you're planning for your retirement, you want a certain level of
          confidence that you won't lose all of your money. You might win it big
          with risky investments, but you could also lose all of your money. And
          if you do lose all of your money, then you would need to go back to
          work. Nobody who is FIRE'd wants to do that.
        </p>
        <h2 className="secondaryHeader">The Right Way To Invest</h2>
        <p className="appParagraph">
          Instead of picking one or a handful of companies to invest in, it is
          better to invest in <i>every</i> company in the stock market. The
          reason is because on average, all of the companies in the stock market
          together grow in value by about 7% from year to year (not accounting
          for <Link to="/guides/inflation">inflation</Link>).
        </p>
        <p className="appParagraph">
          You may be surprised to learn that this number even factors in huge
          economic recessions like the Great Depression. But that’s just how
          averages work. Sometimes, the stock market will do very bad, but more
          often than not it does well.
        </p>
        <h2 className="secondaryHeader">Risk Versus Volatility</h2>
        <p className="appParagraph">
          Because of the average growth of the stock market, I think of
          investing in the entire stock market as being low risk. What this
          means is that there is a very good chance that you will earn money
          when you invest in the whole stock market over a long enough period of
          time.
        </p>
        <p className="appParagraph">
          However, the stock market is very <i>volatile</i>. This means that the
          value of your investment may fluctuate a lot from day to day. If you
          put in $10,000 in one day, it’s entirely possible that it could drop
          in value to $7,500 overnight. When this happens, you need to stomach
          the economic downturn and just leave your money there. It may take
          some time (even a few years), but history tells us that you are likely
          to get your money back, and then some.
        </p>
        <p className="appParagraph">
          Because of the volatility of the stock market, it doesn't make sense
          to put every single dollar that you have into stocks. For instance, if
          you know you need to pay your rent at the end of the month, then it
          wouldn't be wise to put your rent money into the stock market.
          Instead, investing in the stock market makes sense for the money that
          you're holding onto for long-term use, such as retirement savings.
        </p>
        <h2 className="secondaryHeader">I'm Convinced, What's Next?</h2>
        <p className="appParagraph">
          This guide is an introduction to investing in the stock market. You
          should walk away from it feeling more confident that investing in the
          stock market is worth looking into, especially if you're thinking
          about FIRE.
        </p>
        <p className="appParagraph">
          As you may have guessed, there's a lot more to get into when it comes
          to the stock market. How exactly does one go about investing in the
          entire stock market? How do retirement portfolios account for
          volatility? Future guides will answer these questions and more.
        </p>
      </div>
    );
  }
}
