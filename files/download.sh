## b3ropc01
# Login b3ropc01, 1 xterm ssh cpr005 and 2 ssh ttd3
ssh cpr005
ssh ttd3
# on ttd3
statft -23 -c
# on cpr005
cd ~/hslb/trunk/ise12/
booths -a hslb.bit
tesths -a
record -a | less
# on ttd3
trigft -23 poisson 100 -1
# stop : on ttd3
resetft -23
#mask on ttd3 17 for O3 only
regft -23 170 <bit flag>
----

## For FELIX, bdaq
ssh ttd15
ssh copper04

(on ttd15)

bootft -24 ~nakao/run/ftsw/ft2u090.bit

(on copper04)

bootrx ~nakao/run/ttrx/tt5r046.bit
booths -a ~nakao/run/hslb/hslb067_xtal.bit
booths -b ~nakao/run/hslb/hslb_b2l057.bit
tesths -a -100000

(on ttd15)

#status
statft -24 -c
# send data
trigft -24 poisson 100 -1
# send some data
trigft -24 poisson 30000 100000
# cancel
resetft -24
-----
