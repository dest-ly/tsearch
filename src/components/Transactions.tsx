import styles from '../styles/Transactions.module.css'
import type { TransactionFilters } from '../util/transactionFilters'

type TransactionsProps = {
    filters: TransactionFilters
}

export function Transactions({ filters }: TransactionsProps) {
    void filters

    return (
        <div className={styles.transactions}>
            <h3>Results</h3>
            <table style={{width: "100%"}}>
                {/* Header */}
                <tr style={{textAlign: 'left'}}>
                    <th style={{width: '10%' }}>Date</th>
                    <th style={{width: '10%' }}>ATM ID</th>
                    <th style={{width: '10%' }}>Customer PAN</th>
                    <th style={{width: '40%' }}>Description</th>
                    <th style={{width: '30%' }}>Code</th>
                </tr>
                {/* Contents, dynamically generated */}
                <tr style={{textAlign: 'left'}}>
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