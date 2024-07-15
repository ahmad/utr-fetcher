## UTR Fetcher

This is a simple script that fetches UTR data for a list of players from UTRSports.

## Usage

1. Create a file called `players.list` in the root directory of the project.
2. Add the URLs of the players you want to fetch data for, one per line.
3. Run `npm start` to start the script.

## Output

The script will output the UTR data for each player in the following format:

```
Name,Doubles,Doubles Reliability,Singles,Singles Reliability
Ahmad Amin,6.62,100,6.6,100
```

## Notes

- The script uses the `auth_token` environment variable to authenticate with UTRSports.
- The script reads the list of players from the `players.list` file.