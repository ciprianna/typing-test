<script>
  import randomWords from 'random-words';
  import { wpm } from "../utils/wpmCalculation";
  import { minuteCalculation } from "../utils/timer";

  let length = 0;
  let startTime = 60;
  let timerStarted = false;
  let test = '';
  let removeSecond;
  let sentence = randomWords({ exactly: 30, join: ' ' });
  let goal = 45;

  const adjustTime = () => {
    startTime = startTime - 1;
    updateTimer();
  };

  const updateTimer = () => {
    if (startTime > 0 && timerStarted) {
      removeSecond = setTimeout(adjustTime, 1000);
    }
  }

  const resetTimer = () => {
    timerStarted = false;
    length = 0;
    test = '';
    clearTimeout(removeSecond);
    startTime = 60;
    document.querySelector('label').innerHTML = sentence;
  }

  const onType = (e) => {
    const value = e.currentTarget.value;
    length = value.length;
    // Try to convert characters to px value for scrolling
    // document.querySelector('#sentence').scrollTo({left: length, behavior: 'smooth'})
    const label = document.querySelector('label');
    const alreadyTyped = label.innerText.split('');
     const styled = alreadyTyped.map((letter, i) => {
      if (i < length) {
        if(letter === value[i]) {
          return `<span class="correct">${letter}</span>`
        } else {
          return `<span class="error">${letter}</span>`
        }
      }
      return letter;
    });
    label.innerHTML = styled.join('');
  }

  // TODO -
  // 1. Restrict width to X amount of characters and only show that many
  // 2. Display sentence above input field with same sizing
  // 3. Calculate with accuracy in mind
  // 4. Display errors? red letters or some sort of effect
  // 5. Get shark
  // 6. Allow users to set goal wpm
  // 7. Calculate shark rate of movement for goal over input length
  // 8. Animate shark to match wpm goal
  // 9. Success and fail results/animations
  // 10. Better designs
  // 11. Animation mode for letters
  // 12. Music

</script>

<svelte:head>
  <title>Welcome</title>
</svelte:head>

<h1>🦈 Shark Bites 🦈</h1>

<button on:click={() => { timerStarted = true;  updateTimer(); }}>Start</button>
<button on:click={() => resetTimer()}>Reset</button>

<div class="flex-centered">
  <h2 class="inline">Characters Typed: {length}</h2>
  <h2 class="inline">WPM: {wpm(length, minuteCalculation(startTime, timerStarted))}</h2>
  <h2 class="inline">Timer: {startTime}s</h2>
</div>

<div class="typing-area">
  <!-- {#each sentences as sent, i} -->
    <label for="type" id={`sentence`}>{sentence}</label>
    <textarea id="type" bind:value={test} on:keyup={onType} disabled={startTime === 0} />
  <!-- {/each} -->
</div>


<style global>
	body {
		background-color: aquamarine;
		font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    padding-left: 30px;
    padding-right: 30px;
	}
  input {
    width: 100%;
    min-height: 30px;
  }

  .flex-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inline {
    display: inline;
    margin: 20px;
  }

  .correct {
    color: forestgreen;
    /* font-weight: bold; */
  }

  .error {
    color: red;
    /* font-weight: bold; */
  }

  .typing-area,
  .typing-area textarea {
    font-size: 24px;
    line-height: 30px;
    text-align: start;
  }

  .typing-area label {
    position: relative;
    top: 94px;
    left: 3px;
    font-family: monospace;
    color: slategray;
  }

  .typing-area textarea {
    width: 100%;
    background: transparent;
    height: 500px;
  }
</style>
