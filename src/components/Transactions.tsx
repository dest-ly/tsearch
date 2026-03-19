import styles from '../styles/Transactions.module.css'

export function Transactions() {
    return (
        <div className={styles.transactions}>
            <h3>Transactions</h3>

            <table style={{width: "100%"}}>
                {/* Header */}
                <tr>
                    <th>Date</th>
                    <th>ATM ID</th>
                    <th>Customer PAN</th>
                    <th>Description</th>
                    <th>Code</th>
                </tr>
                {/* Contents */}
                <tr>
                    <td>11/05/2020</td>
                    <td>TT1121</td>
                    <td>430395XXXXXX5987</td>
                    {/* Logs, use ul here */}
                    <td>
                        <ul>
                            <li>Card inserted</li>
                            <li>Card inserted</li>
                            <li>Card inserted</li>
                        </ul>
                    </td>
                    <td>11/05/20 21:35:43</td>
                </tr>
            </table>
        </div>
    )
}