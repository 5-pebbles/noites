# Introduction To Finite Automata

> Prerequisite: [Introduction to Set Theory](../set-theory/introduction.md)

A finite automaton is a mathematical model of a limited computational machine. The machine can be in one of a finite number of states at any given time.

### Definitions

**Finite Automaton:** A finite automaton can be mathematically defined by a 5-tuple $(Q, \Sigma, \delta, q_0, F)$

- $Q$ is a finite set of states
- $\Sigma$ is a finite set of input symbols
- $\delta$ is the transition function $\delta: Q \times \Sigma \rightarrow Q$
- $q_0$ is the initial state
- $F$ is the set of accepting states

**Strings & Languages:**
- **String:** A finite sequence of symbols from $\Sigma$.
- **Language:** A set of strings which may be finite or infinite.
- **Empty String:** A string $\epsilon$ containing no symbols.
- **Empty Language:** A language $\emptyset$ containing no strings.

**Accepts String:** A finite automaton $M$ accepts a string $w = w_1,\ w_2,\ w_3,\ ...\ w_n$ where each $w_i\ \in\ \Sigma$ if there is a sequence of states $r_0,\ r_1,\ r_2,\ ...\ r_n\ \in\ Q$ such that:

- $r_0 = q_0$
- $r_i = \delta(r_{i-1}, w_i)\ for\ i\ \in\ \\{ 1, 2, ..., n\\}$
- $r_n\ \in\ F$

**Recognizes Language:** A finite automaton $M$ recognizes a language $A$ if $A\ =\ \\{ w\ |\ M\ accepts\ w \\}$

**Language of Machine:** You can say that $A$ is the language of $M$, and that $A\ =\ L(M)$ if $M$ recognizes $A$.

**Regular Language:** A language is regular if some finite automaton recognizes it.

Each machine accepts only one language. If the machine recognizes no strings, then it recognizes the empty language $\emptyset$.

### Example

**Take the machine $M_1$ defined as:**

- $Q = \\{q_1, q_2, q_3\\}$
- $\Sigma = \\{0, 1\\}$
- $\delta$:

| $Q$ | $0$ | $1$ |
| --- | --- | --- |
| $q_1$ | $q_1$ | $q_2$ |
| $q_2$ | $q_1$ | $q_3$ |
| $q_3$ | $q_3$ | $q_3$ |

- $q_0 = \\{q_1\\}$
- $F = \\{q_3\\}$

**Example Inputs:**

- `01101` $\rightarrow$ Accepted
- `00101` $\rightarrow$ Rejected

$M_1$ accepts exactly those strings in $A$ where
    $A\ =\ \\{ w\ |\ w\ contains\ substring\ 11 \\}$

$A$ is a regular language, because $M_1$ recognizes it.


### Question

Define a finite automaton that accepts the language of all strings containing an even number of 1's.

**Solution:**

The correct finite automaton is defined as follows:

- $Q = \\{q_1, q_2\\}$
- $\Sigma = \\{0, 1\\}$
- $\delta$:

| $Q$ | $0$ | $1$ |
| --- | --- | --- |
| $q_1$ | $q_1$ | $q_2$ |
| $q_2$ | $q_2$ | $q_1$ |

- $q_0\ =\ \\{q_1\\}$
- $F\ =\ \\{q_1\\}$

### Notes

Let $C$ = $\\{ w\ |\ w\ contains\ even\ number\ of\ 1's\ and\ 0's \\}$

$C$ is not a regular language.

### Operations on Languages

Let $A$ and $B$ be languages:

- **Union:** $A\ \cup\ B\ =\ \\{ w\ |\ w\ \in\ A\ or\ w\ \in\ B \\}$

- **Concatenation:** $A\ \cdot\ B\ =\ \\{ xy\ |\ x\ \in\ A\ and\ y\ \in\ B \\}\=\ AB$

- **Kleene Closure:** $A^*\ =\ \\{ x_1\ ...\ x_n\ |\ each\ x_i\ \in\ A\ for\ n\ \geq\ 0 \\}$

**Examples:**

- $\\{ 0, 1 \\}\ \cup\ \\{ 1, 2 \\}\ =\ \\{ 0, 1, 2 \\}$
- $\\{ 0, 1 \\}\ \cdot\ \\{ 1, 2 \\}\ =\ \\{ 01, 02, 11, 12 \\}$
- $\\{ 0, 1 \\}^*\ =\ \\{ \epsilon, 0, 1, 00, 01, 10, 11, ... \\}$

It is always that case that $\epsilon\ \in\ A^*$.

### Regular Expressions

- **Built from:** $\Sigma,\ \emptyset,\ \epsilon$
- **Using:** $\cup,\ \cdot,\ *$

**Examples:**

- $(0\ \cup\ 1)^\*\ =\ \Sigma^*\ All\ possible\ strings\ of\ \Sigma$
- $\Sigma^*1\ =\ All\ strings\ ending\ in\ 1$
- $\Sigma^\*\ 11\ \Sigma^\*\ =\ All\ strings\ containing\ 11\ =\ L(M_1)$

Anything you can do with a finite automaton, you can do with a regular expression & vice versa.

### Theorems

---

**Theorem:** If $A_1,\ A_2$ are regular languages, so is $A_1\ \cup\ A_2$.

> Let $M_1$ = $(Q_1,\ \Sigma,\ \delta_1,\ q_1,\ F_1)$ which recognizes $A_1$
> & $M_2$ = $(Q_2,\ \Sigma,\ \delta_2,\ q_2,\ F_2)$ which recognizes $A_2$.
> 
> **Define $M$ = $(Q,\ \Sigma,\ \delta,\ q_0,\ F)$ which recognizes $A_1\ \cup\ A_2$ where:**
> 
> - $Q\ =\ Q_1\ \times\ Q_2$
> - $\Sigma$
> - $\delta((r_1,\ r_2),\ a)\ =\ (\delta_1(r_1,\ a),\ \delta_2(r_2,\ a))$
> - $q_0\ =\ (q_1,\ q_2)$
> - $F\ =\ F_1\ \cup\ F_2$
> 
> 
> $M$ is a finite automata & it recognizes $A_1\ \cup\ A_2$. Therefore, $A_1\ \cup\ A_2$ is a regular language.
> 
> **Quod Erat Demonstrandum**

---

**Theorem:** If $A_1,\ A_2$ are regular languages, so is $A_1\ \cdot\ A_2$.

> Let $M_1$ = $(Q_1,\ \Sigma,\ \delta_1,\ q_1,\ F_1)$ which recognizes $A_1$ & $M_2$ = $(Q_2,\ \Sigma,\ \delta_2,\ q_2,\ F_2)$ which recognizes $A_2$.
> 
> 
> **Define $M$ = $(Q,\ \Sigma,\ \delta,\ q_0,\ F)$ which recognizes $A_1\ \cdot\ A_2$ where:**
> 
> I will figure this out tomorrow. I am tired, good night o7
