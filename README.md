# CRDT - LWW Set

This repository holds the code required to create a CRDT (conflict free replicated data type) LWW (last write wins) set.
Please note that this is written in Javascript.

## Getting Started

1) Run the following:
    ```bash
    npm install
    ```

2) To start testing, run:
    ```bash
    npm test
    ```

## Notes
The code written in this repository takes assumption that the timestamps given can be determined by the user of these sets.
As a result of this assumption, a comparison to a ISO timestamp to a normal integer can be assumed as the same.
