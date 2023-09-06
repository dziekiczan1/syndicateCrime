import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import casinoCards from "@/constants/sections/casinocards";
import useCasinoActions from "@/lib/useCasinoActions";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CasinoContent.module.scss";
import Controls from "./Controls";
import Hand from "./Hand";
import Status from "./Status";

enum GameState {
  bet,
  init,
  userTurn,
  dealerTurn,
}

enum Deal {
  user,
  dealer,
  hidden,
}

export enum Message {
  bet = "Place a Bet!",
  hitStand = "Hit or Stand?",
  userWin = "You Win!",
  dealerWin = "Dealer Wins!",
  tie = "Tie!",
}

const CasinoContent: React.FC = () => {
  const pageData = pageDescriptions.casino;
  const messageRef = useRef<HTMLDivElement>(null);
  const { handleAction } = useCasinoActions(messageRef);

  const data = casinoCards;
  const [deck, setDeck]: any[] = useState(data);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.bet);
  const [message, setMessage] = useState(Message.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });

  useEffect(() => {
    if (gameState === GameState.init) {
      drawCard(Deal.user);
      drawCard(Deal.hidden);
      drawCard(Deal.user);
      drawCard(Deal.dealer);
      setGameState(GameState.userTurn);
      setMessage(Message.hitStand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.userTurn) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (userScore > 21) {
        checkWin();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(Deal.dealer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCount]);

  const resetGame = () => {
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);

    setGameState(GameState.bet);
    setMessage(Message.bet);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const placeBet = (amount: number) => {
    setBet(amount);
    setGameState(GameState.init);
  };

  const drawCard = (dealType: Deal) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      const updatedDeck = [...deck];
      updatedDeck.splice(randomIndex, 1);
      setDeck(updatedDeck);

      switch (card.suit) {
        case "spades":
          dealCard(dealType, card.value, "♠");
          break;
        case "diamonds":
          dealCard(dealType, card.value, "♦");
          break;
        case "clubs":
          dealCard(dealType, card.value, "♣");
          break;
        case "hearts":
          dealCard(dealType, card.value, "♥");
          break;
        default:
          break;
      }
    } else {
      setDeck(data);
    }
  };

  const dealCard = (dealType: Deal, value: string, suit: string) => {
    switch (dealType) {
      case Deal.user:
        userCards.push({ value: value, suit: suit, hidden: false });
        setUserCards([...userCards]);
        break;
      case Deal.dealer:
        dealerCards.push({ value: value, suit: suit, hidden: false });
        setDealerCards([...dealerCards]);
        break;
      case Deal.hidden:
        dealerCards.push({ value: value, suit: suit, hidden: true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  };

  const revealCard = () => {
    dealerCards.filter((card: any) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  const calculate = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (card.hidden === false && card.value !== "A") {
        switch (card.value) {
          case "K":
            total += 10;
            break;
          case "Q":
            total += 10;
            break;
          case "J":
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === "A";
    });
    aces.forEach((card: any) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21) {
          if (aces.length > 1) {
            total += 1;
          } else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    });
    setScore(total);
  };

  const hit = () => {
    drawCard(Deal.user);
  };

  const stand = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.dealerTurn);
    revealCard();
  };

  const checkWin = async () => {
    try {
      if ((userScore <= 21 && userScore > dealerScore) || dealerScore > 21) {
        buttonState.resetDisabled = true;
        const userWin = Math.round(bet * 2 * 100) / 100;
        setBet(userWin);
        setMessage(Message.userWin);
        const response = await handleAction(userWin, "winBet");
        if (response) {
          buttonState.resetDisabled = false;
        } else {
          console.error("Failed to update user data:");
        }
      } else if (dealerScore > userScore) {
        setMessage(Message.dealerWin);
      } else {
        setBet(Math.round(bet * 1 * 100) / 100);
        if (userScore > 21) {
          buttonState.hitDisabled = true;
          buttonState.standDisabled = true;
          buttonState.resetDisabled = false;
          setMessage(Message.dealerWin);
        } else {
          buttonState.resetDisabled = true;
          setMessage(Message.tie);
          const response = await handleAction(bet, "tieBet");
          if (response) {
            buttonState.resetDisabled = false;
          } else {
            console.error("Failed to update user data:");
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while updating user data:", error);
    }
  };

  return (
    <>
      {" "}
      <div className={styles.container}>
        <PageHeader pageData={pageData} />
        <Status message={message} balance={bet} />
        <Controls
          gameState={gameState}
          buttonState={buttonState}
          betEvent={placeBet}
          hitEvent={hit}
          standEvent={stand}
          resetEvent={resetGame}
        />
        <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
        <Hand title={`Your Hand (${userScore})`} cards={userCards} />
      </div>
    </>
  );
};

export default CasinoContent;
