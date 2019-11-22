let btn = document.getElementsByTagName("button")[0];
btn.onclick = function() {
	let main = document.getElementById("main");
	main.classList.add("animated", "fadeOutUp");
	main.addEventListener("animationend", function() {
		main.style.display = "none";
		let forms = document.getElementById("main2");
		forms.style.display = "flex";
		forms.classList.add("animated", "fadeInUp");
	});
};

let submit = document.getElementById("submit");
submit.onclick = function() {
	let competitors = document.getElementById("competitors").value;
	let rooms = document.getElementById("rooms").value;
	let rounds = parseInt(document.getElementById("rounds").value);
	let finalists = document.getElementById("finalists").value;
	let inRoom = competitors / rooms;
	let remainder = competitors % rooms;
	let worst = inRoom * rounds;
	let best = rounds;
	let margin = worst - best;
	let bp = Math.floor(finalists / competitors * margin) + rounds; 
	inRoom = Math.floor(inRoom);
	// If competitor's rank is greater than or equal to the breakpoint they break.
	// Therefore, the problem can be simplified to a coin exchange problem.
	let dp = Array(bp);
	for (let i = 0; i <= bp; i++) {
		dp[i] = Array(rounds);
		for (let j = 0; j <= rounds; j++) {
			dp[i][j] = Array(remainder);
			for (let k = 0; k <= remainder; k++) {
				dp[i][j][k] = [-1, 0];
			}
		}
	}
	function mine(value, moves, specMove) {
		if (dp[value][moves][specMove][0] != -1) return dp[value][moves][specMove][0];
		if (moves === 0) return value;
		t = []
		for (let i = 1; i <= bp - value && i <= inRoom; i++) t.push(i);
		let best = 0;
		if (specMove > 0 && value + inRoom + 1 <= bp) t.push(inRoom + 1);
		if (t.length === 0 && specMove === 0) return 0;
		for (const l of t) {
			if (l === inRoom + 1) specMove--;
			let score = mine(value + l, moves - 1, specMove);
			if (score >= best) {
			    best = score;
				dp[value][moves][specMove][1] = [value + l, moves - 1, specMove];
			}
			if (l === inRoom + 1) specMove++;
		}
		if (moves === 1) console.log(best);
		dp[value][moves][specMove][0] = best;
		return best;
	}
	let answer = mine(0, rounds, remainder);
	console.log(answer);
	let current = 0;
	let ranks = [];
	let pos = [0, rounds, remainder];
	while (pos != 0) {
		ranks.push(dp[pos[0]][pos[1]][pos[2]][1][0] - current)
		current = dp[pos[0]][pos[1]][pos[2]][1][0];
		pos = dp[pos[0]][pos[1]][pos[2]][1];
	}
	ranks.pop()
	console.log(ranks);
	document.getElementById("bp").innerText = answer;
	document.getElementById("ranks").innerText = ranks;
	let main = document.getElementById("main2");
	main.classList.add("animated", "fadeOutUp");
	main.addEventListener("animationend", function () {
		main.style.display = "none";
		let main3 = document.getElementById("main3");
		main3.style.display = "block";
		main3.classList.add("animated", "fadeInUp");
	});
}
