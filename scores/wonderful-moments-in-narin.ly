\version "2.24.3"

\header {
	title = "Wonderful Moments in Narin"
	subtitle = "나린의 즐거운 순간들"
	composer = "채하나 (ASTERIA)"
	arranger = "Arr. @nuttyversal"
	tagline = "Engraved with 🖤 at the https://nuttyver.se/"
}

\score {
	{
		\time 4/4
		\clef treble

		<<
			\time 4/4
			\clef treble
			\key d
			\major
			\relative {
				\partial 8. a'16(\upbow b d)                            | % mm. 0
				cis8. a16~ a8 b8~ b16 fis16~ fis8 g8 a8                 | % mm. 1
				d,2. r16 a'( b d)                                       | % mm. 2
				cis8. a16~ a8 b8~ b16 fis16~ fis8 g8. fis32( e)         | % mm. 3
				d2. r16 d(\upbow e fis)                                 | % mm. 4
				e8. a,16~ a8 a'~ a4~ a8 g16-. fis-.                     | % mm. 5
				g4~ g16 fis16-. e-. d~ d4 r16 d( e fis)                 | % mm. 6
				g8~ g16 d16~ d8 \acciaccatura a' b8~ b4 r16 b cis a~    | % mm. 7
				a1~                                                     | % mm. 8
				a2. r16 a(\upbow b d)                                   | % mm. 9

				cis8. a16~ a8 b8~ b16 fis16~ fis8 g8 a8                 | % mm. 10
				d,2. r16 a'( b d)                                       | % mm. 11
				cis8. a16~ a8 b8~ b16 fis16~ fis8 g8. fis32( e)         | % mm. 12
				d2. r16 d( e fis)                                       | % mm. 13
				e8. a,16~ a8 a'~ a4~ a8. g32( fis)                      | % mm. 14
				g4~ g16 fis16( e) d~ d4 r16 d( e fis)                   | % mm. 15
				g8~ g16 d16~ d8 \acciaccatura a' b8~ b4~ b16 cis( d e)  | % mm. 16
				a,1~                                                    | % mm. 17
				a2 r2 \bar "||"                                         | % mm. 18

				b2.~(\downbow b16 cis d e)                              | % mm. 19
				a,2.~ a8. g32 fis                                       | % mm. 20
				g2~ g8 fis d e                                          | % mm. 21
				fis1                                                    | % mm. 22
				d'2.~ d16 e fis g                                       | % mm. 23
				cis,4~ cis8 a16 d16~ d4~ d8 d8~                         | % mm. 24
				d4~ d16 c c bes bes a a g \tuplet 3/2 { g8 a bes }      | % mm. 25
				a1~                                                     | % mm. 26
				a2 r2 \bar "||"                                         | % mm. 27
			}

			\new Staff <<
				\clef "treble_8"
				\key d
				\major
				\relative {
					\partial 8. r8.                                         | % mm. 0
					d8 a'16 d16~ d16 e8 d16~ d16 a8 d,16 e'8 d16 a          | % mm. 1
					d,8 b'16 d16~ d16 g8 d16~ d16 b8 d,16 g'8 d8            | % mm. 2
					d,8 cis'16 e16~ e16 a8 e16~ e16 cis8 d,16 a'8 e8        | % mm. 3
					d8 a'16 d16~ d16 g8 d16~ d16 a8 d,16 g'8 d8             | % mm. 4
					cis,8 e16 a16~ a16 e'8 a,16~ a16 e8 cis16 e'8 a,8       | % mm. 5
					c,8 g'16 c16~ c16 g'8 c,16~ c16 g8 c,16 g''8 c,16 g16   | % mm. 6
					b,8 a'16 d16~ d16 g8 d16~ d16 a8 b,16 g''8 d16 a16      | % mm. 7
					a,8 a'16 b16~ b16 d8 cis16~ cis16 g'8 d16 cis8 a8       | % mm. 8
					a,8 e'16 cis'16~ cis16 a'16 d,8 \acciaccatura b cis2    | % mm. 9

					r1                                                      | % mm. 10
					r1                                                      | % mm. 11
					r1                                                      | % mm. 12
					r1                                                      | % mm. 13
					r1                                                      | % mm. 14
					r1                                                      | % mm. 15
					r1                                                      | % mm. 16
					r1                                                      | % mm. 17
					r1                                                      | % mm. 18

					r1                                                      | % mm. 19
					r1                                                      | % mm. 20
					r1                                                      | % mm. 21
					r1                                                      | % mm. 22
					r1                                                      | % mm. 23
					r1                                                      | % mm. 24
					r1                                                      | % mm. 25
					r1                                                      | % mm. 26
					r1                                                      | % mm. 27
				}
			>>

			\new Staff <<
				\clef bass
				\key d
				\major
				\relative {
					\partial 8. r8.                                         | % mm. 0
					r1                                                      | % mm. 1
					r1                                                      | % mm. 2
					r1                                                      | % mm. 3
					r1                                                      | % mm. 4
					r1                                                      | % mm. 5
					r1                                                      | % mm. 6
					r1                                                      | % mm. 7
					r1                                                      | % mm. 8
					r1                                                      | % mm. 9

					d2.~ d8 g16 a                                           | % mm. 10
					d,2.~ d8. a16                                           | % mm. 11
					d2.~ d8 a16 e'                                          | % mm. 12
					d1                                                      | % mm. 13
					cis1                                                    | % mm. 14
					c2.~ c8 a'16 b                                          | % mm. 15
					b,2. a'4                                                | % mm. 16
					a,2~ a8. d16 e8 d                                       | % mm. 17
					a1                                                      | % mm. 18

					g4 d'8. g,16~ g16 g d'8 g fis                           | % mm. 19
					fis,4 cis'8. fis,16~ fis16 fis16 fis8 f4                | % mm. 20
					e4 b'8 bes16 a~ a a e'8 a e                             | % mm. 21
					g,4 d'8. g,16~ g16 g d'8 g8 g,8                         | % mm. 22
					fis2 r                                                  | % mm. 23
					r1                                                      | % mm. 24
					r1                                                      | % mm. 25
					r1                                                      | % mm. 26
					r1                                                      | % mm. 27
				}
			>>
		>>
	}

	\midi { }
	\layout { }
}
