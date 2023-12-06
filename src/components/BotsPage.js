import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [bots, setBots] = useState([]);

  // Fetch bots from the backend
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("http://localhost:8002/bots");
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };

    fetchBots();
  }, []);

  // Assuming you have a state to track enlisted bots
  const [enlistedBots, setEnlistedBots] = useState([]);

  const addToArmy = (bot) => {
    setEnlistedBots((prevEnlistedBots) => [...prevEnlistedBots, bot]);
  };

  const releaseFromArmy = (bot) => {
    setEnlistedBots((prevEnlistedBots) => prevEnlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id));
  };

  return (
    <div>
      <YourBotArmy army={enlistedBots} releaseFromArmy={releaseFromArmy} />
      <BotCollection bots={bots} addToArmy={addToArmy} />
    </div>
  );
}

export default BotsPage;

