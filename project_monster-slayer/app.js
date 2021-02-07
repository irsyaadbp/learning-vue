const MIN_DAMAGE_PLAYER = 5;
const MAX_DAMAGE_PLAYER = 12;

const MIN_DAMAGE_MONSTER = 8;
const MAX_DAMAGE_MONSTER = 15;

const MIN_HEAL_VALUE = 8;
const MAX_HEAL_VALUE = 20;

const getRandomValue = (minValue, maxValue) =>
  Math.floor(Math.random() * (maxValue - minValue)) + minValue;

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackToMonster() {
      this.currentRound++;
      const attackDamage = getRandomValue(MIN_DAMAGE_PLAYER, MAX_DAMAGE_PLAYER);
      this.monsterHealth -= attackDamage;

      this.addLogMessage("player", "attack", attackDamage);
      // Monster counter attack
      this.attackToPlayer();
    },
    attackToPlayer() {
      const attackDamage = getRandomValue(
        MIN_DAMAGE_MONSTER,
        MAX_DAMAGE_MONSTER
      );
      this.playerHealth -= attackDamage;
      this.addLogMessage("monster", "attack", attackDamage);
    },
    specialAttackToMonster() {
      this.currentRound++;
      const minSpecialAttackDamage = MIN_DAMAGE_PLAYER * 2;
      const maxSpecialAttackDamage = MAX_DAMAGE_MONSTER * 1.5;
      const attackDamage = getRandomValue(
        minSpecialAttackDamage,
        maxSpecialAttackDamage
      );
      this.monsterHealth -= attackDamage;
      this.addLogMessage("player", "special attack", attackDamage);
      // Monster counter attack
      this.attackToPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(MIN_HEAL_VALUE, MAX_HEAL_VALUE);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      this.addLogMessage("player", "heal", healValue);

      // Monster attack
      this.attackToPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(actionBy, actionType, actionValue) {
      this.logMessages.unshift({ actionBy, actionType, actionValue });
    },
  },
});

app.mount("#game");
