# Tempt Docs
* [`tempted`](#tempted)
* [`untempt`](#untempt)
* [`who`](#who)

--------------------------------------------------
<a name="tempted"/>

## @{gameName} tempted

This command registers the sender as tempted to play __{gameName}__ in the current thread.
Currently, tempts auto-expire after 10 minutes. In the future this will be customizable.

__Usage__

`@{gameName} tempted`

__Arguments__

* `{gameName}`: The name of the game to be tempted with.

__Example__

>`@csgo tempted`

*William Wang is tempted to play CSGO.*

--------------------------------------------------
<a name="untempt"/>

## @{gameName} untempt

This command unregisters the sender from being tempted to play __{gameName}__ in the current thread if they are currently tempted.

__Usage__

`@{gameName} untempt`

__Arguments__

* `{gameName}`: The name of the game to untempt from.

__Example__

>`@csgo untempt`

*William Wang is no longer tempted to play CSGO.*

--------------------------------------------------
<a name="who"/>

## @{gameName} who

This gives a list of the players in the current thread who are currently tempted to play __{gameName}__.

__Usage__

`@{gameName} who`

__Arguments__

* `{gameName}`: The name of the game to list tempted players of.

__Example__

>`@csgo who`
* 0 tempted:
*No one is tempted to play CSGO in this thread.*
* 1 tempted:
*William Wang is tempted to play CSGO.*
* 2+ tempted:
*William Wang, Michael Li are tempted to play CSGO.*